import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <div class="d-flex navbar shadow-sm bg-body-tertiary w-100 px-3">
        <div class=" w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div class="col-8">
              <a class="navbar-brand" href="#">
                Dynamic Auth
              </a>
            </div>
            <div class="col-4">
              <a class="text-decoration-none" href="/login">
                Demo Login
              </a>
              <a class="text-decoration-none ps-3" href="/">
                Admin
              </a>
              {/* bypass */}
              <a class="text-decoration-none ps-3" href="/bypass">
                Bypass
              </a>
            </div>
          </div>
        </div>
      </div>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
