import {MigrationInterface, QueryRunner} from "typeorm";

export class entidadTracking1631891110297 implements MigrationInterface {
    name = 'entidadTracking1631891110297'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_fe64b9a8732c96430d145885dcc"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_c8f2010734eec81e729e22e7378"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_cfa49e90637c0817f52ae5f2284"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_a2b147a66cbf2b142b5ed5d0b5f"`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_c8f2010734eec81e729e22e7378" FOREIGN KEY ("term_id") REFERENCES "term"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_cfa49e90637c0817f52ae5f2284" FOREIGN KEY ("brand_id") REFERENCES "term"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_a2b147a66cbf2b142b5ed5d0b5f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_fe64b9a8732c96430d145885dcc" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_fe64b9a8732c96430d145885dcc"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_a2b147a66cbf2b142b5ed5d0b5f"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_cfa49e90637c0817f52ae5f2284"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_c8f2010734eec81e729e22e7378"`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_a2b147a66cbf2b142b5ed5d0b5f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_cfa49e90637c0817f52ae5f2284" FOREIGN KEY ("brand_id") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_c8f2010734eec81e729e22e7378" FOREIGN KEY ("term_id") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_fe64b9a8732c96430d145885dcc" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
