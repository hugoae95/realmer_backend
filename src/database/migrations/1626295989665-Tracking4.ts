import {MigrationInterface, QueryRunner} from "typeorm";

export class Tracking41626295989665 implements MigrationInterface {
    name = 'Tracking41626295989665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" ADD "brand_id" integer`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_cfa49e90637c0817f52ae5f2284" FOREIGN KEY ("brand_id") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_cfa49e90637c0817f52ae5f2284"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP COLUMN "brand_id"`);
    }

}
