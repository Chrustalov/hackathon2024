class AddIndexToTagName < ActiveRecord::Migration[7.1]
  def change
    def change
      add_index :tags, :name, unique: true
    end
  end
end
