import {MigrationInterface, QueryRunner} from "typeorm";

export class jee11627329661220 implements MigrationInterface {
    name = 'jee11627329661220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "field_brand" DROP CONSTRAINT "FK_ac63d70d405a2f0a28fbe8e5cc1"`);
        await queryRunner.query(`ALTER TABLE "field_brand" DROP CONSTRAINT "FK_5887ceaf974567a188896bea3cd"`);
        await queryRunner.query(`ALTER TABLE "field_brand" ADD CONSTRAINT "FK_5887ceaf974567a188896bea3cd" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field_brand" ADD CONSTRAINT "FK_ac63d70d405a2f0a28fbe8e5cc1" FOREIGN KEY ("term_id") REFERENCES "term"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "field_brand" DROP CONSTRAINT "FK_ac63d70d405a2f0a28fbe8e5cc1"`);
        await queryRunner.query(`ALTER TABLE "field_brand" DROP CONSTRAINT "FK_5887ceaf974567a188896bea3cd"`);
        await queryRunner.query(`ALTER TABLE "field_brand" ADD CONSTRAINT "FK_5887ceaf974567a188896bea3cd" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "field_brand" ADD CONSTRAINT "FK_ac63d70d405a2f0a28fbe8e5cc1" FOREIGN KEY ("term_id") REFERENCES "term"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
