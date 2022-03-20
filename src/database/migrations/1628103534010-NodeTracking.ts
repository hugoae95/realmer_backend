import {MigrationInterface, QueryRunner} from "typeorm";

export class NodeTracking1628103534010 implements MigrationInterface {
    name = 'NodeTracking1628103534010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" ADD "node_id" integer`);
        await queryRunner.query(`ALTER TABLE "tracking" ADD CONSTRAINT "FK_fe64b9a8732c96430d145885dcc" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tracking" DROP CONSTRAINT "FK_fe64b9a8732c96430d145885dcc"`);
        await queryRunner.query(`ALTER TABLE "tracking" DROP COLUMN "node_id"`);
    }

}
