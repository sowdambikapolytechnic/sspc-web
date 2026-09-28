"use strict";
/**
 * Prisma seed script — creates the three built-in roles and seeds the
 * departments matching the legacy database.
 *
 * Run with:  npx prisma db seed
 *
 * Requires DATABASE_URL / DIRECT_URL to be set in .env.local (pointing at
 * your Supabase project's direct connection string, port 5432).
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var bcrypt = require("bcryptjs");
var db = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var roles, _i, _a, name_1, role, roleMap, departments, createdDepts, _b, departments_1, d, dept, existingAdmin, passwordHash, sectionTypes, _c, sectionTypes_1, type;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log("🌱 Seeding database…");
                    roles = [];
                    _i = 0, _a = ["SUPER_ADMIN", "ADMIN", "FACULTY"];
                    _d.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                    name_1 = _a[_i];
                    return [4 /*yield*/, db.role.upsert({
                            where: { name: name_1 },
                            update: {},
                            create: { name: name_1 },
                        })];
                case 2:
                    role = _d.sent();
                    roles.push(role);
                    _d.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    roleMap = Object.fromEntries(roles.map(function (r) { return [r.name, r]; }));
                    console.log("  ✓ Roles created:", roles.map(function (r) { return r.name; }).join(", "));
                    departments = [
                        { name: "Civil Engineering", slug: "civil-engineering" },
                        { name: "Electrical and Electronics", slug: "electrical-electronics" },
                        { name: "Electronics Communication", slug: "electronics-communication" },
                        { name: "Information Technology", slug: "information-technology" },
                        { name: "Mechanical Engineering", slug: "mechanical-engineering" },
                        { name: "Textile Technology", slug: "textile-technology" },
                        { name: "Management", slug: "management" },
                        { name: "Refrigeration and Air Conditioning", slug: "refrigeration-air-conditioning" },
                    ];
                    createdDepts = [];
                    _b = 0, departments_1 = departments;
                    _d.label = 5;
                case 5:
                    if (!(_b < departments_1.length)) return [3 /*break*/, 8];
                    d = departments_1[_b];
                    return [4 /*yield*/, db.department.upsert({
                            where: { slug: d.slug },
                            update: { name: d.name },
                            create: { name: d.name, slug: d.slug },
                        })];
                case 6:
                    dept = _d.sent();
                    createdDepts.push(dept);
                    _d.label = 7;
                case 7:
                    _b++;
                    return [3 /*break*/, 5];
                case 8:
                    console.log("  ✓ Departments created:", createdDepts.length);
                    return [4 /*yield*/, db.user.findUnique({
                            where: { email: "admin@sowdambikapolytechnic.com" },
                        })];
                case 9:
                    existingAdmin = _d.sent();
                    if (!!existingAdmin) return [3 /*break*/, 12];
                    return [4 /*yield*/, bcrypt.hash("ChangeMe@123", 12)];
                case 10:
                    passwordHash = _d.sent();
                    return [4 /*yield*/, db.user.create({
                            data: {
                                email: "admin@sowdambikapolytechnic.com",
                                name: "Super Admin",
                                passwordHash: passwordHash,
                                roleId: roleMap["SUPER_ADMIN"].id,
                                active: true,
                            },
                        })];
                case 11:
                    _d.sent();
                    console.log("  ✓ SUPER_ADMIN user created: admin@sowdambikapolytechnic.com / ChangeMe@123");
                    console.log("  ⚠️  Change this password immediately after first login!");
                    return [3 /*break*/, 13];
                case 12:
                    console.log("  ℹ  SUPER_ADMIN user already exists — skipped.");
                    _d.label = 13;
                case 13:
                    sectionTypes = ["NCC", "NSS", "RRC", "CIICP", "Transportation"];
                    _c = 0, sectionTypes_1 = sectionTypes;
                    _d.label = 14;
                case 14:
                    if (!(_c < sectionTypes_1.length)) return [3 /*break*/, 17];
                    type = sectionTypes_1[_c];
                    return [4 /*yield*/, db.institutionalSection.upsert({
                            where: { type: type },
                            update: {},
                            create: { type: type, title: type, description: "" },
                        })];
                case 15:
                    _d.sent();
                    _d.label = 16;
                case 16:
                    _c++;
                    return [3 /*break*/, 14];
                case 17:
                    console.log("  ✓ Institutional sections seeded:", sectionTypes.join(", "));
                    console.log("🌱 Seed complete.");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    process.exit(1);
})
    .finally(function () { return db.$disconnect(); });
