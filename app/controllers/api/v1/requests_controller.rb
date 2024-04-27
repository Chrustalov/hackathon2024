class Api::V1::RequestsController < ApplicationController
  before_action :set_request, only: %i[ show update destroy ]

  # GET /requests
  def index

    @tags = Tag.where(id: params[:tags])
    @requests = Requests::Filter.call(Request.all, params)

    request_data_with_tags = []

    @requests.each do |request|
      request_attributes = request.attributes.symbolize_keys

      tag_names = request.tags.pluck(:name)

      request_attributes[:tags] = tag_names
      request_attributes[:photo] = request.photo.url

      request_data_with_tags << request_attributes
    end

    render json: { requests: request_data_with_tags, tags: @tags, all_tags: Tag.all.pluck(:name)}
  end

  # GET /requests/1
  def show
    render json: @request
  end

  # POST /requests
  def create
    @request = current_user.requests.build(request_params)
    if @request.save
      render json: @request, status: :created, location: api_v1_requests_path
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /requests/1
  def update
    if @request.update(request_params)
      render json: @request
    else
      render json: @request.errors, status: :unprocessable_entity
    end
  end

  # DELETE /requests/1
  def destroy
    @request.destroy!
  end

  private

  def set_request
    @request = Request.find(params[:id])
  end

  def request_params
    params.require(:request).permit(:title, :body, :photo, tag_ids: [])
  end
end
