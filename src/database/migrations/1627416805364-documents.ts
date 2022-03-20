import {MigrationInterface, QueryRunner} from "typeorm";

export class documents1627416805364 implements MigrationInterface {
    name = 'documents1627416805364'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_c7481daf5059307842edef74d73"`);
        await queryRunner.query(`ALTER TABLE "nodes_documents" DROP CONSTRAINT "FK_cb2a13bbbd9fb18d2e5dc4d2ba3"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_c7481daf5059307842edef74d73" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "nodes_documents" ADD CONSTRAINT "FK_cb2a13bbbd9fb18d2e5dc4d2ba3" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nodes_documents" DROP CONSTRAINT "FK_cb2a13bbbd9fb18d2e5dc4d2ba3"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_c7481daf5059307842edef74d73"`);
        await queryRunner.query(`ALTER TABLE "nodes_documents" ADD CONSTRAINT "FK_cb2a13bbbd9fb18d2e5dc4d2ba3" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_c7481daf5059307842edef74d73" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
