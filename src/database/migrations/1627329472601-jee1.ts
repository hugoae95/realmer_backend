import {MigrationInterface, QueryRunner} from "typeorm";

export class jee11627329472601 implements MigrationInterface {
    name = 'jee11627329472601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_67e979b8942acc80137116b6f12"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b66c79f0c63e89df6386068e6f9"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b66c79f0c63e89df6386068e6f9" FOREIGN KEY ("trivia_id") REFERENCES "trivia"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_67e979b8942acc80137116b6f12" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_67e979b8942acc80137116b6f12"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b66c79f0c63e89df6386068e6f9"`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b66c79f0c63e89df6386068e6f9" FOREIGN KEY ("trivia_id") REFERENCES "trivia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_67e979b8942acc80137116b6f12" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
