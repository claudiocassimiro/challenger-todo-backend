import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1695918244982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase("todo_db", true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase("todo_db", true);
  }
}
