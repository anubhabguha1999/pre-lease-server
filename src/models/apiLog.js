const mongoose = require("mongoose");

const apiLogSchema = new mongoose.Schema(
  {
    userId: { type: String, default: null },
    httpMethod: { type: String, required: true },
    endpoint: { type: String, required: true },
    requestHeaders: { type: mongoose.Schema.Types.Mixed, default: null },
    requestBody: { type: mongoose.Schema.Types.Mixed, default: null },
    queryParams: { type: mongoose.Schema.Types.Mixed, default: null },
    responseStatus: { type: Number, default: null },
    responseBody: { type: mongoose.Schema.Types.Mixed, default: null },
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
    requestTimestamp: { type: Date, default: Date.now },
    responseTimestamp: { type: Date, default: null },
    responseTimeMs: { type: Number, default: null },
    errorMessage: { type: String, default: null },
    stackTrace: { type: String, default: null },
    environment: { type: String, default: null },
  },
  {
    timestamps: false,
    collection: "api_logs",
  }
);

apiLogSchema.index({ userId: 1 });
apiLogSchema.index({ endpoint: 1 });
apiLogSchema.index({ requestTimestamp: -1 });
apiLogSchema.index({ responseStatus: 1 });

const ApiLog = mongoose.model("ApiLog", apiLogSchema);

module.exports = ApiLog;
