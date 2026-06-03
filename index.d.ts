declare function reportAction(path?: string): void;

declare const reporter: {
  reportAction: typeof reportAction;
};

export { reportAction };
export default reporter;
