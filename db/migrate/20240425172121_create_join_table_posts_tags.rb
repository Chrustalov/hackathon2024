class CreateJoinTablePostsTags < ActiveRecord::Migration[7.1]
  def change
    create_join_table :requests, :tags do |t|
       t.index [:request_id, :tag_id]
       t.index [:tag_id, :request_id]
    end
  end
end
