import {MigrationInterface, QueryRunner} from "typeorm";

export class nodevalueopt1632235140259 implements MigrationInterface {
    name = 'nodevalueopt1632235140259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "node_fields_value" ALTER COLUMN "value" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "node_fields_value" ALTER COLUMN "value" SET NOT NULL`);
    }

}
