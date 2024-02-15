declare module "koa" {
    interface Context {
        _useless: never;
    }
}
