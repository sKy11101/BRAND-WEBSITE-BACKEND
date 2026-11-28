import pool from "../config/db.js";

export const saveSurvey = async (surveyData) => {

    const {
        name,
        city,
        state,
        phone,
        email
    } = surveyData;

    const query = `
        INSERT INTO survey_submissions
        (
            name,
            city,
            state,
            phone,
            email
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;
    `;

    const values = [
        name,
        city,
        state,
        phone,
        email
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
};
