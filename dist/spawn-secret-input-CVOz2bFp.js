//#region src/process/spawn-secret-input.ts
function addSecretInputStdio(stdio, secretInput) {
	if (!secretInput) return;
	if (!Number.isInteger(secretInput.fd) || secretInput.fd < 3) throw new Error("secret input file descriptor must be an integer greater than 2");
	while (stdio.length <= secretInput.fd) stdio.push("ignore");
	stdio[secretInput.fd] = process.platform === "win32" ? "overlapped" : "pipe";
}
async function writeSecretInputToChild(child, secretInput) {
	if (!secretInput) return;
	const stream = child.stdio[secretInput.fd];
	if (!stream || typeof stream.end !== "function") throw new Error(`secret input file descriptor ${secretInput.fd} is unavailable`);
	let data;
	try {
		data = secretInput.createData();
		await new Promise((resolve, reject) => {
			let settled = false;
			const settle = (error) => {
				if (settled) return;
				settled = true;
				if (error) reject(error);
				else resolve();
			};
			const onError = (error) => {
				settle(error);
			};
			stream.on("error", onError);
			stream.once("close", () => {
				stream.off("error", onError);
			});
			stream.end(data, settle);
		});
	} finally {
		data?.fill(0);
	}
}
//#endregion
export { writeSecretInputToChild as n, addSecretInputStdio as t };
