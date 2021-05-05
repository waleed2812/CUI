async function getData() {
    try {
        const a = await someFunction();
        const b = await someOtherFunction();
        if (a && b) console.log("some result");
    } catch (err) {
        console.log(error)
    }
}
