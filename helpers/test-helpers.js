const PREFIX = "VM Exception while processing transaction: ";

export async function tryCatch(promise, message) {
    try {
        await promise;
        throw null;
    }
    catch (error) {
        assert(error, "Expected an error but did not get one");
    }
};