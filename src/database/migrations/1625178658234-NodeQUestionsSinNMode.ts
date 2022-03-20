import {MigrationInterface, QueryRunner} from "typeorm";

export class NodeQUestionsSinNMode1625178658234 implements MigrationInterface {
    name = 'NodeQUestionsSinNMode1625178658234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_504296b56ad319e3442d1379fe7"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP COLUMN "node_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" ADD "node_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_504296b56ad319e3442d1379fe7" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
