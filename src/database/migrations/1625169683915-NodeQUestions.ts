import {MigrationInterface, QueryRunner} from "typeorm";

export class NodeQUestions1625169683915 implements MigrationInterface {
    name = 'NodeQUestions1625169683915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nodes_questions" ("node_id" integer NOT NULL, "question_id" integer NOT NULL, CONSTRAINT "PK_8f0d881b4b407ff77109350b91f" PRIMARY KEY ("node_id", "question_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_296da6b6755fe14dd06a757ae3" ON "nodes_questions" ("node_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_f767f6193bbd2b2d9431109cd9" ON "nodes_questions" ("question_id") `);
        await queryRunner.query(`ALTER TABLE "nodes_questions" ADD CONSTRAINT "FK_296da6b6755fe14dd06a757ae37" FOREIGN KEY ("node_id") REFERENCES "nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "nodes_questions" ADD CONSTRAINT "FK_f767f6193bbd2b2d9431109cd95" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nodes_questions" DROP CONSTRAINT "FK_f767f6193bbd2b2d9431109cd95"`);
        await queryRunner.query(`ALTER TABLE "nodes_questions" DROP CONSTRAINT "FK_296da6b6755fe14dd06a757ae37"`);
        await queryRunner.query(`DROP INDEX "IDX_f767f6193bbd2b2d9431109cd9"`);
        await queryRunner.query(`DROP INDEX "IDX_296da6b6755fe14dd06a757ae3"`);
        await queryRunner.query(`DROP TABLE "nodes_questions"`);
    }

}
