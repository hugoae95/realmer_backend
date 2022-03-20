import {MigrationInterface, QueryRunner} from "typeorm";

export class fieldNodes1625029437085 implements MigrationInterface {
    name = 'fieldNodes1625029437085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "node_fields" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "title" character varying(255), "type" character varying(255) NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "entity_id" integer NOT NULL, CONSTRAINT "UQ_83546244fcb0aa6237e496958fb" UNIQUE ("name"), CONSTRAINT "PK_f4421e6f5900b702f40005191a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "node_fields_value" ("id" SERIAL NOT NULL, "value" text NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "node_id" integer NOT NULL, "node_field_id" integer NOT NULL, CONSTRAINT "PK_89f9323f573acd18f42218bb588" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "node_fields" ADD CONSTRAINT "FK_832822111434284fbb659827f19" FOREIGN KEY ("entity_id") REFERENCES "content_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" ADD CONSTRAINT "FK_b291106dd67b3fc1b3f29d5d9b8" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" ADD CONSTRAINT "FK_284da919cd996de6754a7cd770e" FOREIGN KEY ("node_field_id") REFERENCES "node_fields"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "node_fields_value" DROP CONSTRAINT "FK_284da919cd996de6754a7cd770e"`);
        await queryRunner.query(`ALTER TABLE "node_fields_value" DROP CONSTRAINT "FK_b291106dd67b3fc1b3f29d5d9b8"`);
        await queryRunner.query(`ALTER TABLE "node_fields" DROP CONSTRAINT "FK_832822111434284fbb659827f19"`);
        await queryRunner.query(`DROP TABLE "node_fields_value"`);
        await queryRunner.query(`DROP TABLE "node_fields"`);
    }

}
