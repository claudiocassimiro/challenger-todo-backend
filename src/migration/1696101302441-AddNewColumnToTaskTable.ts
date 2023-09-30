import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNewColumnToTaskTable1696101302441
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE tasks ADD COLUMN completed BOOLEAN DEFAULT false;"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE tasks DROP COLUMN completed;");
  }
}
