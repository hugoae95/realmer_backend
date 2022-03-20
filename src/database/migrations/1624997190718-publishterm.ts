import {MigrationInterface, QueryRunner} from "typeorm";

export class publishterm1624997190718 implements MigrationInterface {
    name = 'publishterm1624997190718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "taxonomy" ALTER COLUMN "publish" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "publish" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term" ALTER COLUMN "publish" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "taxonomy" ALTER COLUMN "publish" DROP NOT NULL`);
    }

}
