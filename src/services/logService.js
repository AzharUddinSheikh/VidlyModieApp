import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

function init() {
    Sentry.init({
    dsn: "https://c50c7bb99a9147f4bad073c87857bfaa@o4504147009667072.ingest.sentry.io/4504147018645504",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
});
}

function log(error) {
    Sentry.captureEvent(error);
}

export default {
    init,
    log
};