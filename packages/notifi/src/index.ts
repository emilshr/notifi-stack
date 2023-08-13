import superjson from "superjson";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { PackageRouter } from "@web/src/server/api/root";

const ACCESS_TOKEN = "access_token";

type ApplicationCrashWatcherProps = ConnectionProps;

type ConnectionProps = {
  projectApiKey: string;
  projectId: string;
  connectionEndpoint: string;
  logErrors?: boolean;
};

class LocalStorageService {
  protected accessToken: string | null;

  constructor() {
    this.accessToken = localStorage.getItem(ACCESS_TOKEN);
  }

  protected setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
}

class Connection extends LocalStorageService {
  private projectApiKey: string;

  private projectId: string;

  private connectionEndpoint: string;

  protected trpcClient = this.generateClient();

  private logErrors: boolean;

  constructor({
    projectApiKey,
    projectId,
    logErrors,
    connectionEndpoint,
  }: ConnectionProps) {
    super();
    this.projectApiKey = projectApiKey;
    this.connectionEndpoint = connectionEndpoint;
    this.projectId = projectId;
    this.logErrors = logErrors || false;
  }

  private generateClient(accessToken?: string) {
    const token = this.projectApiKey;
    return createTRPCProxyClient<PackageRouter>({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${this.connectionEndpoint}/api/packageTrpc`,
          headers() {
            return {
              "x-access-key": accessToken ?? "",
            };
          },
        }),
      ],
      transformer: superjson,
    });
  }

  protected printLogs(message?: any, ...optionalParams: any[]) {
    if (this.logErrors) {
      console.log("[NOTIFI ERROR LOGGER]", message, optionalParams);
    }
  }

  async authenticate() {
    try {
      const { accessToken } =
        await this.trpcClient.package.getAccessToken.mutate({
          projectApiKey: this.projectApiKey,
          projectId: this.projectId,
        });
      this.trpcClient = this.generateClient(accessToken);
    } catch (error) {
      this.printLogs(`Error while authenticating with the server`, error);
    }
  }
}

export class ApplicationCrashWatcher extends Connection {
  constructor(props: ApplicationCrashWatcherProps) {
    super(props);
  }

  errorHandler: OnErrorEventHandlerNonNull = (
    event,
    source,
    lineNo,
    colNo,
    error
  ) => {
    console.log("Error detected", { source, lineNo, colNo, error });
  };

  unhandledRejectionHandler: (event: PromiseRejectionEvent) => any = () => {};

  watchErrorEvents() {
    try {
      window.onerror = this.errorHandler;
      window.onunhandledrejection = this.unhandledRejectionHandler;
    } catch (error) {
      console.error(`Error while watching for scroll events ... ${error}`);
    }
  }

  main() {
    this.authenticate()
      .then(() => {
        // Registering methods on the main thread
        this.watchErrorEvents();
      })
      .catch((err) => {
        this.printLogs("Error while authenticating", err);
      });
  }
}
