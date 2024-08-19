"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Credentials_1 = require("./Credentials");
const Turns_1 = require("./Turns");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 50,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], User.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 30,
        unique: true
    }),
    __metadata("design:type", String)
], User.prototype, "nDni", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "profilePicture", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Credentials_1.Credentials, credentials => credentials.user),
    __metadata("design:type", Credentials_1.Credentials)
], User.prototype, "credentials", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Turns_1.Turns, turn => turn.user),
    __metadata("design:type", Array)
], User.prototype, "turns", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({
        name: "users",
    })
], User);
