/* eslint-disable @typescript-eslint/no-unsafe-assignment */

type CellProps = {
  hashedSecret: string;
  id: string;
  name: string;
  createdAt: Date;
};

const Cell = ({ createdAt, hashedSecret, name }: CellProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex flex-[3] items-center">{name}</div>
      <div className="flex flex-1 items-center text-slate-400">{`${hashedSecret.slice(
        0,
        3
      )}....${hashedSecret.slice(
        hashedSecret.length - 3,
        hashedSecret.length - 1
      )}`}</div>
      <div className="flex flex-1 items-center text-slate-400">
        {createdAt.toLocaleString()}
      </div>
      <div className="flex flex-1 items-center">
        <div className="flex items-center justify-end gap-x-6 whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
          <span
            className="cursor-pointer text-slate-400 hover:underline"
            onClick={(event) => {
              event.stopPropagation();
              navigator.clipboard.writeText(hashedSecret);
            }}
          >
            Copy
          </span>
          <span className="cursor-pointer text-red-600 hover:underline">
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export const ApiKeyList = ({ apiKeys }: { apiKeys: CellProps[] }) => {
  return (
    <div className="overflow-x-scroll rounded-md border-[1px] border-slate-700 p-4 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col gap-y-4 divide-y divide-slate-700">
        <div className="flex font-extrabold">
          <div className="flex flex-[3]">Name</div>
          <div className="flex flex-1">API Key</div>
          <div className="flex flex-1">Created</div>
          <div className="flex flex-1"></div>
        </div>
        <div className="divide-y divide-slate-700">
          {apiKeys.map((key) => (
            <Cell {...key} key={key.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
