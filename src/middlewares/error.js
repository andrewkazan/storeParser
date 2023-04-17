export const error = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        return ctx.render('error', {
            message: err.message,
            error: err.status
        });
    }
};
