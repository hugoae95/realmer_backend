import {MigrationInterface, QueryRunner} from "typeorm";

export class fieldTerm1624999380722 implements MigrationInterface {
    name = 'fieldTerm1624999380722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_fields" ADD "title" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "term_fields" DROP COLUMN "title"`);
    }

}
