const ApiLog = require("../models/apiLog");
const { AuditLog } = require("../models/index");

const logRequest = async (req, responseData, startTime) => {
  try {
    const endTime = Date.now();

    const safeHeaders = { ...req.headers };
    if (safeHeaders.authorization) {
      safeHeaders.authorization = "[REDACTED]";
    }
    if (safeHeaders.cookie) {
      safeHeaders.cookie = "[REDACTED]";
    }

    await ApiLog.create({
      userId: responseData.userId || null,
      httpMethod: req.method,
      endpoint: req.originalUrl || req.url,
      requestHeaders: safeHeaders,
      requestBody: responseData.requestBodyLog || null,
      queryParams: req.query,
      responseStatus: responseData.status,
      responseBody: responseData.body,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      requestTimestamp: new Date(startTime),
      responseTimestamp: new Date(endTime),
      responseTimeMs: endTime - startTime,
      errorMessage: responseData.error || null,
      stackTrace: responseData.stackTrace || null,
      environment: process.env.NODE_ENV || "development",
    });
  } catch (err) {
    console.error("API log failed:", err.message);
  }
};

const logInsert = async ({
  userId,
  entityType,
  recordId,
  newRecord,
  tableName,
  ipAddress,
  userAgent,
  transaction,
}) => {
  return await AuditLog.create(
    {
      userId,
      operation: "INSERT",
      entityType,
      recordId,
      oldValue: null,
      newValue: newRecord,
      tableName,
      ipAddress,
      userAgent,
    },
    { transaction }
  );
};

const logUpdate = async ({
  userId,
  entityType,
  recordId,
  oldValues,
  newValues,
  tableName,
  ipAddress,
  userAgent,
  transaction,
}) => {
  return await AuditLog.create(
    {
      userId,
      operation: "UPDATE",
      entityType,
      recordId,
      oldValue: oldValues,
      newValue: newValues,
      tableName,
      ipAddress,
      userAgent,
    },
    { transaction }
  );
};

const logDelete = async ({
  userId,
  entityType,
  recordId,
  oldRecord,
  tableName,
  ipAddress,
  userAgent,
  transaction,
}) => {
  return await AuditLog.create(
    {
      userId,
      operation: "DELETE",
      entityType,
      recordId,
      oldValue: oldRecord,
      newValue: null,
      tableName,
      ipAddress,
      userAgent,
    },
    { transaction }
  );
};

const buildUpdateValues = (oldRecord, updateData) => {
  const oldValues = {};
  const newValues = {};

  Object.keys(updateData).forEach((field) => {
    if (oldRecord[field] !== updateData[field]) {
      oldValues[field] = oldRecord[field];
      newValues[field] = updateData[field];
    }
  });

  return { oldValues, newValues };
};

module.exports = {
  logRequest,
  logInsert,
  logUpdate,
  logDelete,
  buildUpdateValues,
};
