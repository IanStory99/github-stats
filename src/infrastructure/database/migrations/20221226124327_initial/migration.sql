-- CreateTable
CREATE TABLE "Organization" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "NAME" TEXT NOT NULL,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "ORGANIZATION_ID" TEXT NOT NULL,
    "NAME" TEXT NOT NULL,
    "SLUG" TEXT NOT NULL,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL,
    CONSTRAINT "Team_ORGANIZATION_ID_fkey" FOREIGN KEY ("ORGANIZATION_ID") REFERENCES "Organization" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "ORGANIZATION_ID" TEXT NOT NULL,
    "TEAM_ID" TEXT NOT NULL,
    "LOGIN" TEXT NOT NULL,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL,
    CONSTRAINT "User_ORGANIZATION_ID_fkey" FOREIGN KEY ("ORGANIZATION_ID") REFERENCES "Organization" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_TEAM_ID_fkey" FOREIGN KEY ("TEAM_ID") REFERENCES "Team" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Repository" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "OWNER_USER_ID" TEXT,
    "OWNER_ORGANIZATION_ID" TEXT,
    "NAME" TEXT NOT NULL,
    "URL" TEXT NOT NULL,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL,
    CONSTRAINT "Repository_OWNER_USER_ID_fkey" FOREIGN KEY ("OWNER_USER_ID") REFERENCES "User" ("ID") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Repository_OWNER_ORGANIZATION_ID_fkey" FOREIGN KEY ("OWNER_ORGANIZATION_ID") REFERENCES "Organization" ("ID") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PullRequest" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "AUTHOR_ID" TEXT NOT NULL,
    "REPO_ID" TEXT NOT NULL,
    "MERGED_AT" DATETIME,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL,
    CONSTRAINT "PullRequest_AUTHOR_ID_fkey" FOREIGN KEY ("AUTHOR_ID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PullRequest_REPO_ID_fkey" FOREIGN KEY ("REPO_ID") REFERENCES "Repository" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "AUTHOR_ID" TEXT NOT NULL,
    "PULLREQ_ID" TEXT NOT NULL,
    "STATE" TEXT NOT NULL,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL,
    CONSTRAINT "Review_AUTHOR_ID_fkey" FOREIGN KEY ("AUTHOR_ID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_PULLREQ_ID_fkey" FOREIGN KEY ("PULLREQ_ID") REFERENCES "PullRequest" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReviewComment" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "REVIEW_ID" TEXT NOT NULL,
    "AUTHOR_ID" TEXT NOT NULL,
    "TEXT" TEXT NOT NULL,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL,
    CONSTRAINT "ReviewComment_REVIEW_ID_fkey" FOREIGN KEY ("REVIEW_ID") REFERENCES "Review" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReviewComment_AUTHOR_ID_fkey" FOREIGN KEY ("AUTHOR_ID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Commit" (
    "ID" TEXT NOT NULL PRIMARY KEY,
    "AUTHOR_ID" TEXT NOT NULL,
    "PULLREQ_ID" TEXT NOT NULL,
    "ADDITIONS" INTEGER NOT NULL,
    "DELETIONS" INTEGER NOT NULL,
    "TIMESTAMP" DATETIME NOT NULL,
    "CREATED_AT" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UPDATED_AT" DATETIME NOT NULL,
    CONSTRAINT "Commit_AUTHOR_ID_fkey" FOREIGN KEY ("AUTHOR_ID") REFERENCES "User" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Commit_PULLREQ_ID_fkey" FOREIGN KEY ("PULLREQ_ID") REFERENCES "PullRequest" ("ID") ON DELETE RESTRICT ON UPDATE CASCADE
);
