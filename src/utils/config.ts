import pino from "pino";

export const getLogger = () => {
  const defaultLevel = process.env.log_level || "info";

  return pino({
    level: defaultLevel,
    transport: {
      target: "pino-pretty",
    },
  });
};