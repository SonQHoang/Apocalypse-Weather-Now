<<<<<<<< HEAD:flask-backend/migrations/versions/7edcd05c9e67_create_tables.py
"""create tables

Revision ID: 7edcd05c9e67
Revises: 
Create Date: 2023-08-30 19:33:44.173647
========
"""Updated migration

Revision ID: 56d6fc752bdd
Revises: 
Create Date: 2023-08-29 11:23:09.867477
>>>>>>>> 48419dae36574d9f77988ae6e1c938c1e3f461e9:flask-backend/migrations/versions/56d6fc752bdd_updated_migration.py

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
<<<<<<<< HEAD:flask-backend/migrations/versions/7edcd05c9e67_create_tables.py
revision = '7edcd05c9e67'
========
revision = '56d6fc752bdd'
>>>>>>>> 48419dae36574d9f77988ae6e1c938c1e3f461e9:flask-backend/migrations/versions/56d6fc752bdd_updated_migration.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('location', sa.String(), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('prepper_type', sa.String(), nullable=True),
    sa.Column('prepper_description', sa.String(), nullable=True),
    sa.Column('bio', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('locations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('city', sa.String(), nullable=True),
    sa.Column('state', sa.String(), nullable=True),
    sa.Column('country', sa.String(), nullable=False),
    sa.Column('zipcode', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('stories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tips',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('weather_category', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('story_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('story_likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('story_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['story_id'], ['stories.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tip_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tip_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('body', sa.String(), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['tip_id'], ['tips.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tip_likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tip_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tip_id'], ['tips.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###

    op.execute(f'ALTER TABLE SET SCHEMA users {SCHEMA};')
    op.execute(f'ALTER TABLE SET SCHEMA locations {SCHEMA};')
    op.execute(f'ALTER TABLE SET SCHEMA stories {SCHEMA};')
    op.execute(f'ALTER TABLE SET SCHEMA tips {SCHEMA};')
    op.execute(f'ALTER TABLE SET SCHEMA story_comments {SCHEMA};')
    op.execute(f'ALTER TABLE SET SCHEMA story_likes {SCHEMA};')
    op.execute(f'ALTER TABLE SET SCHEMA tip_comments {SCHEMA};')
    op.execute(f'ALTER TABLE SET SCHEMA tip_likes {SCHEMA};')



def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tip_likes')
    op.drop_table('tip_comments')
    op.drop_table('story_likes')
    op.drop_table('story_comments')
    op.drop_table('tips')
    op.drop_table('stories')
    op.drop_table('locations')
    op.drop_table('users')
    # ### end Alembic commands ###
