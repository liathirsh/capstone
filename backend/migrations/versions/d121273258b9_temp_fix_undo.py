"""temp fix undo

Revision ID: d121273258b9
Revises: 66c559d6598a
Create Date: 2023-01-31 20:52:43.129463

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd121273258b9'
down_revision = '66c559d6598a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('package', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(), nullable=True))
        batch_op.drop_column('descriptions')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('package', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descriptions', sa.VARCHAR(), autoincrement=False, nullable=True))
        batch_op.drop_column('description')

    # ### end Alembic commands ###
