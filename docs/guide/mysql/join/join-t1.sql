EXPLAIN FORMAT=JSON
SELECT *
FROM small_table s
JOIN large_table l ON s.key_col = l.key_col;

{
    "query_block": {
        "select_id": 1,
        "cost_info": {
            "query_cost": "103039.65"
        },
        "nested_loop": [
            {
                "table": {
                    "table_name": "s",
                    "access_type": "ALL",
                    "rows_examined_per_scan": 100,
                    "rows_produced_per_join": 100,
                    "filtered": "100.00",
                    "cost_info": {
                        "read_cost": "0.25",
                        "eval_cost": "10.00",
                        "prefix_cost": "10.25",
                        "data_read_per_join": "100K"
                    },
                    "used_columns": [
                        "id",
                        "key_col",
                        "data_col"
                    ]
                }
            },
            {
                "table": {
                    "table_name": "l",
                    "access_type": "ALL",
                    "rows_examined_per_scan": 10302,
                    "rows_produced_per_join": 103020,
                    "filtered": "10.00",
                    "using_join_buffer": "Block Nested Loop",
                    "cost_info": {
                        "read_cost": "9.40",
                        "eval_cost": "10302.00",
                        "prefix_cost": "103039.65",
                        "data_read_per_join": "101M"
                    },
                    "used_columns": [
                        "id",
                        "key_col",
                        "data_col"
                    ],
                    "attached_condition": "(`join_example`.`l`.`key_col` = `join_example`.`s`.`key_col`)"
                }
            }
        ]
    }
}


EXPLAIN  
SELECT *
FROM small_table s
JOIN large_table l ON s.key_col = l.key_col; 

-- 20011
SELECT count(s.id)
FROM small_table s -- 100
JOIN large_table l -- 10,000
ON s.key_col = l.key_col

