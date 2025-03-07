const knex = require("../config/database");

function mandatoryColumns() {
  return `table.timestamp("created_dt").defaultTo(knex.fn.now());table.string("created_by").defaultTo("SYSTEM");table.timestamp("updated_dt").defaultTo(knex.fn.now());table.string("updated_by").defaultTo("SYSTEM");table.timestamp("deleted_dt");table.string("deleted_by");`;
}
async function loadSchema() {
  const { tables } = await JSON.parse(
    require("fs").readFileSync("./schemas/schemas.json")
  );
  for (let i = 0; i < tables.length; i++) {
    // console.log(tables[i].name);
    let containerColScript = [];
    await knex.schema
      .hasTable(tables[i].name)
      .then((exists) => {
        if (!exists) {
          return knex.schema
            .createTable(tables[i].name, async (table) => {
              table.increments();
              for (let j = 0; j < tables[i].columns.length; j++) {
                containerColScript.push(
                  `table.${tables[i].columns[j].type}('${tables[i].columns[j].name
                  }')${tables[i].columns[j].constraints
                    ? tables[i].columns[j].constraints
                    : ""
                  };`
                );
              }
              await eval(
                containerColScript.join("") + `;${mandatoryColumns()}`
              );
            })
            .then(() => {
              console.log(`${tables[i].name} TABLE CREATED`);
              console.log(
                (containerColScript.join("") + `;${mandatoryColumns()}`)
                  .split(";")
                  .join("\n")
              );
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(`${tables[i].name} Already Exists`);
        }
      })
      .catch((err) => {
        return err;
      });
  }
}

module.exports = {
  loadSchema: loadSchema,
};
