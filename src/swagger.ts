import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shop Backend API",
      version: "1.0.0",
      description: "API documentation for the shop backend",
    },
    servers: [
      {
        url: "http://localhost:5000", // آدرس سرور شما
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // فرمت توکن
        },
      },
    },
    security: [
      {
        bearerAuth: [], // اعمال احراز هویت به صورت پیش‌فرض
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // مسیر فایل‌های روت برای مستندسازی
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
