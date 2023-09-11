"""Added blocked atribute

Revision ID: 0b06d6c4bb74
Revises: 1c5228fd2c0e
Create Date: 2023-09-02 23:04:15.152617

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0b06d6c4bb74'
down_revision = '1c5228fd2c0e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('blocked', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('blocked')

    # ### end Alembic commands ###