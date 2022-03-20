import {MigrationInterface, QueryRunner} from "typeorm";

export class questions1627436782398 implements MigrationInterface {
    name = 'questions1627436782398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88"`);
        await queryRunner.query(`ALTER TABLE "nodes_questions" DROP CONSTRAINT "FK_f767f6193bbd2b2d9431109cd95"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nodes_questions" ADD CONSTRAINT "FK_f767f6193bbd2b2d9431109cd95" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nodes_questions" DROP CONSTRAINT "FK_f767f6193bbd2b2d9431109cd95"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88"`);
        await queryRunner.query(`ALTER TABLE "nodes_questions" ADD CONSTRAINT "FK_f767f6193bbd2b2d9431109cd95" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
