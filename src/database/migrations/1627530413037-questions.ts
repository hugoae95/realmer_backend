import {MigrationInterface, QueryRunner} from "typeorm";

export class questions1627530413037 implements MigrationInterface {
    name = 'questions1627530413037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions_options" DROP CONSTRAINT "FK_4dde0bbd49d894ca656192872d4"`);
        await queryRunner.query(`ALTER TABLE "questions_options" ADD CONSTRAINT "FK_4dde0bbd49d894ca656192872d4" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions_options" DROP CONSTRAINT "FK_4dde0bbd49d894ca656192872d4"`);
        await queryRunner.query(`ALTER TABLE "questions_options" ADD CONSTRAINT "FK_4dde0bbd49d894ca656192872d4" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
