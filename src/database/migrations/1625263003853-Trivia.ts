import {MigrationInterface, QueryRunner} from "typeorm";

export class Trivia1625263003853 implements MigrationInterface {
    name = 'Trivia1625263003853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trivia" ("id" SERIAL NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer NOT NULL, "node_id" integer NOT NULL, CONSTRAINT "PK_faf9ea23fdea1723297b3e92c1a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_2b5a8b27f3d089037c8170d1da5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_e347d2b2643e6f58955e00d27de" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_e347d2b2643e6f58955e00d27de"`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_2b5a8b27f3d089037c8170d1da5"`);
        await queryRunner.query(`DROP TABLE "trivia"`);
    }

}
