import {MigrationInterface, QueryRunner} from "typeorm";

export class jee11627329344475 implements MigrationInterface {
    name = 'jee11627329344475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_2b5a8b27f3d089037c8170d1da5"`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_e347d2b2643e6f58955e00d27de"`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_2b5a8b27f3d089037c8170d1da5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_e347d2b2643e6f58955e00d27de" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_e347d2b2643e6f58955e00d27de"`);
        await queryRunner.query(`ALTER TABLE "trivia" DROP CONSTRAINT "FK_2b5a8b27f3d089037c8170d1da5"`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_e347d2b2643e6f58955e00d27de" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trivia" ADD CONSTRAINT "FK_2b5a8b27f3d089037c8170d1da5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
