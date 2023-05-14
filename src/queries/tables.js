 `
  CREATE TABLE userInfo (
    user_id SERIAL UNIQUE PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
  );
`

 `
  CREATE TABLE companyList (
    list_id SERIAL UNIQUE PRIMARY KEY,
    list_user_id INT NOT NULL,
    company_name VARCHAR(50) NOT NULL,
    location VARCHAR(50),
    company_email VARCHAR(50),
    company_phone VARCHAR(50),
    company_website VARCHAR(225),
    position VARCHAR(50) NOT NULL,
    job_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    date_applied VARCHAR(50) NOT NULL,
    next json,
    notes json,
    favorite BOOLEAN NOT NULL,
    created_at timestamp NOT NULL DEFAULT NOW(),
    FOREIGN KEY (list_user_id) REFERENCES userInfo (user_id) on delete cascade on update cascade
  );
  `

  `
  CREATE TABLE shareStatus (
    post_id SERIAL UNIQUE PRIMARY KEY,
    post_user_id INT NOT NULL,
    total_applied VARCHAR(10) NOT NULL,
    total_onprocess VARCHAR(10) NOT NULL,
    total_noresponse VARCHAR(10) NOT NULL,
    total_offered VARCHAR(10) NOT NULL,
    total_declined VARCHAR(10) NOT NULL,
    today_applied VARCHAR(10) NOT NULL,
    today_onprocess VARCHAR(10) NOT NULL,
    today_noresponse VARCHAR(10) NOT NULL,
    today_offered VARCHAR(10) NOT NULL,
    today_declined VARCHAR(10) NOT NULL,
    post_message VARCHAR(70),
    post_create_date VARCHAR(50) NOT NULL,
    FOREIGN KEY (post_user_id) REFERENCES userInfo (user_id) on delete cascade on update cascade
  );
  `

  `
  CREATE TABLE likePost (
    likePost_id SERIAL UNIQUE PRIMARY KEY,
    likePost_user_id INT NOT NULL,
    likePost_post_id INT NOT NULL,
    FOREIGN KEY (likePost_user_id) REFERENCES userInfo (user_id) on delete cascade on update cascade,
    FOREIGN KEY (likePost_post_id) REFERENCES shareStatus (post_id) on delete cascade on update cascade
  );
  `

  `
  CREATE TABLE comment (
    comment_id SERIAL UNIQUE PRIMARY KEY,
    comment_user_id INT NOT NULL,
    comment_post_id INT NOT NULL,
    comment VARCHAR(100) NOT NULL,
    comment_date VARCHAR(50) NOT NULL,
    FOREIGN KEY (comment_user_id) REFERENCES userInfo (user_id) on delete cascade on update cascade,
    FOREIGN KEY (comment_user_id) REFERENCES shareStatus (post_id) on delete cascade on update cascade
  );
  `