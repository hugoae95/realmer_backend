import {MigrationInterface, QueryRunner} from "typeorm";

export class eee1626107631940 implements MigrationInterface {
    name = 'eee1626107631940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88"`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_0bb75d7d78d1d21846deae55d88" FOREIGN KEY ("option_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
