import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTaskTable1695929980795 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "tasks",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            default: null,
          },
          {
            name: "creation_date",
            type: "timestamp with time zone",
          },
          {
            name: "completion_date",
            type: "timestamp with time zone",
            default: null,
          },
          {
            name: "priority",
            type: "enum",
            enumName: "priority_enum",
            enum: ["alta", "média", "baixa"],
          },
          {
            name: "user",
            type: "uuid",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "tasks",
      new TableForeignKey({
        columnNames: ["user"],
        referencedTableName: "users",
        referencedColumnNames: ["id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tasks");
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
