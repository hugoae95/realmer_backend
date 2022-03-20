import {MigrationInterface, QueryRunner} from "typeorm";

export class Answers1625318250038 implements MigrationInterface {
    name = 'Answers1625318250038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "time" integer NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "trivia_id" integer NOT NULL, "question_id" integer NOT NULL, "option_id" integer NOT NULL, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_b66c79f0c63e89df6386068e6f9" FOREIGN KEY ("trivia_id") REFERENCES "trivia"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_67e979b8942acc80137116b6f12" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_67e979b8942acc80137116b6f12"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"`);
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_b66c79f0c63e89df6386068e6f9"`);
        await queryRunner.query(`DROP TABLE "answers"`);
    }

}
