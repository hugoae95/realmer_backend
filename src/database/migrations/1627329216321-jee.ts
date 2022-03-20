import {MigrationInterface, QueryRunner} from "typeorm";

export class jee1627329216321 implements MigrationInterface {
    name = 'jee1627329216321'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "node_fields_value" DROP CONSTRAINT "FK_b291106dd67b3fc1b3f29d5d9b8"`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" DROP CONSTRAINT "FK_284da919cd996de6754a7cd770e"`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" ADD CONSTRAINT "FK_b291106dd67b3fc1b3f29d5d9b8" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" ADD CONSTRAINT "FK_284da919cd996de6754a7cd770e" FOREIGN KEY ("node_field_id") REFERENCES "node_fields"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "node_fields_value" DROP CONSTRAINT "FK_284da919cd996de6754a7cd770e"`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" DROP CONSTRAINT "FK_b291106dd67b3fc1b3f29d5d9b8"`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" ADD CONSTRAINT "FK_284da919cd996de6754a7cd770e" FOREIGN KEY ("node_field_id") REFERENCES "node_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" ADD CONSTRAINT "FK_b291106dd67b3fc1b3f29d5d9b8" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
