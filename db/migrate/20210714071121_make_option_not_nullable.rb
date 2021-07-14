class MakeOptionNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :options, :option, false
  end
end
