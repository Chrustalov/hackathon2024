class CreateTags < ActiveRecord::Migration[7.1]
  def change
    create_table :tags do |t|
      t.string :name
      t.timestamps
    end

    create_table :requests_tags, id: false do |t|
      t.belongs_to :request
      t.belongs_to :tag
    end

    add_index :requests_tags, [:request_id, :tag_id], unique: true
  end
end
