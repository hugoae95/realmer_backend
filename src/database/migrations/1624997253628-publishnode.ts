import {MigrationInterface, QueryRunner} from "typeorm";

export class publishnode1624997253628 implements MigrationInterface {
    name = 'publishnode1624997253628'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nodes" DROP COLUMN "publish"`);
        await queryRunner.query(`ALTER TABLE "nodes" ADD "publish" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nodes" DROP COLUMN "publish"`);
        await queryRunner.query(`ALTER TABLE "nodes" ADD "publish" character varying NOT NULL`);
    }

}
