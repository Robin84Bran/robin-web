# Reproduce this field study

This source package contains the complete current model, browser illustration, tests and saved evidence. It contains no API key and makes no model requests when you view or replay it.

From this folder, run `python3 -m http.server 8080`, then open `http://localhost:8080/`. A local HTTP server is required because browsers restrict module workers on file URLs. The experiment itself works offline; navigation links refer to the online lab.

With Node.js 22 or newer, run `node --test tests.mjs`, then `node batch.mjs --verify`. No package installation is needed. The README describes model assumptions and commands. For the sixth study, cached model tapes replay offline; running new model inference is a separate explicit command and requires an authenticated, compatible CLI.

`PUBLIC_MANIFEST.json` records SHA-256 checksums for every included file. The ZIP has fixed ordering and timestamps. Historical diagnostics and private workspace state remain in the private project archive.

中文：此包包含当前模型、浏览器插图、测试及保留证据，不含 API 密钥。用本地 HTTP 服务打开 index.html；使用 Node.js 22 或以上运行测试与批次重放。第六个实验默认重放真实模型记录，不会自动发起新调用。
