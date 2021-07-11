class AddSlugToPoll < ActiveRecord::Migration[6.1]
  def change
    add_column :polls, :slug, :string
  end
end
